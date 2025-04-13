"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
	const [query, setQuery] = useState("");
	const [cuisine, setCuisine] = useState("");
	const [prepTime, setPrepTime] = useState("");
  const router = useRouter();

	const isValid = query || cuisine || prepTime;

	const handleSearch = () => {
		const params = new URLSearchParams();

		if (query) params.append("query", query);
		if (cuisine) params.append("cuisine", cuisine);
		if (prepTime) params.append("prepTime", prepTime);

    router.push(`/recipes?${params.toString()}`);
	};

	return (
		<div className='min-h-screen dark:bg-gray-900 flex items-center justify-center p-4'>
			<div className='max-w-md w-full space-y-4'>
				<input
					type='text'
					placeholder='Search for a recipe...'
					value={query}
					onChange={(e) =>
						setQuery(e.target.value)
					}
					className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
				/>

				<select
					value={cuisine}
					onChange={(e) =>
						setCuisine(e.target.value)
					}
					className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
				>
					<option value=''>Select cuisine</option>
					<option value='Italian'>Italian</option>
					<option value='Mexican'>Mexican</option>
					<option value='Chinese'>Chinese</option>
				</select>

				<input
					type='number'
					placeholder='Max preparation time (mins)'
					value={prepTime}
					onChange={(e) =>
						setPrepTime(e.target.value)
					}
					className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
				/>

				<button
					disabled={!isValid}
					onClick={handleSearch}
					className={`${
						isValid
							? "opacity-100"
							: "opacity-20"
					} btn w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 `}
				>
					Next
				</button>
			</div>
		</div>
	);
}
