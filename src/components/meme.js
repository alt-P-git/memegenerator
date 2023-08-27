import React from "react"
import { useState, useEffect } from 'react'; //destructured usestate. or can directly use it by writing React.usestate()

let url;

export default function Meme() {
    //const [memeImage, setMemeImage] = useState("https://i.imgflip.com/30b1gx.jpg")

    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "https://i.imgflip.com/30b1gx.jpg"
    })

    const[ allMemeImages, setAllMemeImages] = useState([])

    /* useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemeImages(data.data.memes))
    }, []) */

    useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemeImages(data.data.memes)
        }
        getMemes()
    }, [])



    function getMemeImage() {
        /* console.log("clicked"); */
        const meme = allMemeImages;
        const  randomNumber = Math.floor(Math.random() * meme.length);
        const url = meme[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
        //url = memesArray[randomNumber].url;
        /* console.log(url); */ 
    }

    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevFormData => {
            return{...prevFormData,
                    [name]: value
            }
        })
    }

    return (
        <main>
            <div className>
                <form className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
            </form>
            <div className="button--container">
                <button className="form--button" onClick={getMemeImage}>
                    Get a new meme image 🖼
                </button>
            </div>
            </div>
            <div className="image--container">
                <img src={meme.randomImage} alt="can't load meme image" className="meme--image"/>
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
            
        </main>
    )
}