function Filter({ setActiveCategory, categories, activeCategory }){

	return(

		<div>

            <select value={activeCategory} onChange={(e) => setActiveCategory(e.target.value)} >
                <option value=''>Select Category</option>
                {categories.map((cat) => (
					<option key={cat} value={cat}>
						{cat}
					</option>
				))}
                
            </select>
			
		</div>



	)
}

export default Filter