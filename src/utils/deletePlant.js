import React from 'react'



export default function deleteItemHandler(id) {
    const updatedPlants = this.state.todos.filter(plant => plant.id !== id);
    this.setState({todos: updatedPlants})
}
