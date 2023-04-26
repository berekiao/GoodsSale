function Filter({ setActiveCategory, categories, activeCategory }){

	return(

		<div>

            <select className="form-select" value={activeCategory} onChange={(e) => setActiveCategory(e.target.value)} >
                <option value=''>---</option>
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