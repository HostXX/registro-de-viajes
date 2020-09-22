import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { createLog } from '../API'



const AddLogForm = ({ coordinates, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('')
    const { register, handleSubmit } = useForm()


    const onSubmit = async (data) => {
        data.latitude = coordinates.latitude;
        data.longitude = coordinates.longitude;
        try {
            setLoading(true);
            const created = await createLog(data)
            console.log(created);
            onClose()
        } catch (error) {
            console.error(error);
            setError(error.message);
            setLoading(false);
        }
    }


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
                {error ? <h3 className="error">{error}</h3> : null}
                <label htmlFor="title">Title</label>
                <input name="title" required ref={register} />
                <label htmlFor="comment">Comment</label>
                <textarea name="comment" rows={3} ref={register}></textarea>
                <label htmlFor="description">Description</label>
                <textarea name="description" rows={3} ref={register}></textarea>
                <label htmlFor="image">Image</label>
                <input name="image" ref={register} />
                <label htmlFor="visitedAt">Visit Date</label>
                <input name="visitedAt" type="date" required ref={register} />
                <button disabled={loading}>{loading ? 'Loading...' : 'Create Entry'}</button>
            </form>
        </div>
    )
}

export default AddLogForm