import Link from "next/link";
import Image from "next/image";

interface Recipe {
	id: number;
	title: string;
	image: string;
}

export default async function RecipesPage({
	searchParams,
}: {
	searchParams?: Promise<{ query?: string; cuisine?: string; prepTime?: string }>;
}) {
	const { query, cuisine, prepTime } = (await searchParams) || {};

	const params = new URLSearchParams({
		apiKey: process.env.SPOONACULAR_API_KEY || "",
		number: "100",
	});

	if (query) params.append("query", query);
	if (cuisine) params.append("cuisine", cuisine);
	if (prepTime) params.append("maxReadyTime", prepTime);

	const url = `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}`;

	let recipes: Recipe[] = [];
	let error = "";

	try {
		const res = await fetch(url, {
			next: { revalidate: 60 },
		});

		if (!res.ok) throw new Error(`API error: ${res.status}`);

		const data = await res.json();

		if (!data.results || !data.results.length) {
			error = "No recipes found. Try a different search.";
		} else {
			recipes = data.results;
		}
	} catch (err: unknown) {
		console.error("🚀 ~ err:", err)
		error = "Failed to fetch recipes. Please try again later.";
	}

	if (error) {
		return (
			<div className='min-h-screen flex items-center justify-center p-6 bg-gray-100 dark:bg-gray-900'>
				<div className='max-w-md w-full text-center'>
					<p className='text-lg text-red-600 dark:text-red-400 mb-4 font-semibold'>
						{error}
					</p>
					<Link
						href='/'
						className='btn w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
					>
						Back to Search
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen dark:bg-gray-900 p-6'>
			<div className='max-w-5xl mx-auto grid items-center gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
				{recipes.map((recipe) => (
					<Link
						key={recipe.id}
						href={`/recipes/${recipe.id}`}
						className='max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 overflow-hidden'
					>
						<Image
							src={recipe.image}
							alt={recipe.title}
							width={400}
							height={300}
							className='w-full h-37 object-cover'
						/>
						<div className='p-4'>
							<h2 className='text-lg font-semibold'>
								{recipe.title}
							</h2>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
