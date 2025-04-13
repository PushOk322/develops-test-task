import Image from "next/image";

interface Recipe {
	id: number;
	title: string;
	image: string;
	extendedIngredients: {
		id: number;
		name: string;
		amount: number;
		unit: string;
	}[];
	readyInMinutes: number;
	servings: number;
	summary: string;
}

export default async function RecipeDetailsPage({
	params,
}: {
	params: { id: string };
}) {
	const recipeId = params.id;

	const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${process.env.SPOONACULAR_API_KEY}`;

	let recipe: Recipe | null = null;
	let error = "";

	try {
		const res = await fetch(url, {
			cache: "no-store",
		});

		if (!res.ok) throw new Error(`API error: ${res.status}`);
		recipe = await res.json();
	} catch (err: any) {
		error = err.message || "Failed to fetch recipe details";
	}

	if (error || !recipe) {
		return (
			<div className='min-h-screen flex items-center justify-center p-6 bg-gray-100 dark:bg-gray-900'>
				<p className='text-lg text-red-600 dark:text-red-400 font-semibold'>
					{error}
				</p>
			</div>
		);
	}

	return (
		<div className='min-h-screen dark:bg-gray-900 p-6'>
			<div className='max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow p-6'>
				<h1 className='text-2xl font-bold mb-4'>
					{recipe.title}
				</h1>
				<Image
					src={recipe.image}
					alt={recipe.title}
					width={800}
					height={500}
					className='rounded mb-6'
				/>
				<p className='text-gray-700 dark:text-gray-300 mb-2'>
					<b>Preparation Time:</b>{" "}
					{recipe.readyInMinutes} minutes
				</p>
				<p className='text-gray-700 dark:text-gray-300 mb-4'>
					<b>Servings:</b> {recipe.servings}
				</p>
				<div
					className='prose dark:prose-invert mb-6'
					dangerouslySetInnerHTML={{
						__html: recipe.summary,
					}}
				/>
				<h2 className='text-xl font-semibold mb-2'>
					Ingredients
				</h2>
				<ul className='list-disc list-inside text-gray-800 dark:text-gray-200'>
					{recipe.extendedIngredients.map(
						(ing) => (
							<li key={ing.id}>
								{ing.amount}{" "}
								{ing.unit}{" "}
								{ing.name}
							</li>
						)
					)}
				</ul>
			</div>
		</div>
	);
}
