import React from "react"; 

const View = ({song, user, deleteSong, editSong}) => {
    const {name, artist, title, complete, form_id, user_id} = song
    const {is_admin, user_id: singer} = user 

    // console.log(singer)
    // console.log(user_id)
    // console.log(song)
    
    return (
        <div>
            {
                is_admin
                ?
                <div>
                    {name}
                    {artist}
                    {title}
                    {complete ? "yes": "no"}
                    <button onClick={() => deleteSong(form_id)}>delete</button>
                </div>
                :
                <div>
                    {name}
                    {artist}
                    {title}
                    
                    {
                        +singer === +user_id &&
                        <button onClick={() => deleteSong(form_id)}>delete</button>
                    }
                    {
                        +singer === +user_id &&
                        <button onClick={() => editSong(form_id)}>edit</button>
                    }
                </div>
            }
        </div>
    )
}

export default View