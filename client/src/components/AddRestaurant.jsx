import React from 'react'

const AddRestaurant = () => {
  return (
    <div className="mb-4">
        <form action="">
            <div className="form-row">
                <div className="col">
                    <input type="text" className="form-control" placeholder="name" />
                </div>
                <div className="col">
                    <input type="text" className="form-control" placeholder="location" />
                </div>
                <div className="col">
                    <select type="text" className="custom-select my-1 mr-sm-2" placeholder="location">
                        <option disabled>Price Range</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <button className="btn btn-primary">Add</button>
            </div>
        </form>
    </div>
  )
};

export default AddRestaurant;