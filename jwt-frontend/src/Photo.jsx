import { useState } from "react"
import './Photo.css'

function Photo ({ onLogOut, showPhoto }) {

    const [selectedImage, setSelectedImage] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(null)
    const [analysisResult, setAnalysisResult] = useState(null)
    const [loading, setLoading] = useState(false)
    const [analyzePressed, setAnalyzePressed] = useState(false)

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (!file) return

        const allowedTypes = ["image/png", "image/jpeg", "image/jpg"]

        if (!allowedTypes.includes(file.type)) {
            alert("Acceptable types: JPG, JPEG, PNG")
            return
        }

        setSelectedImage(file)
        setPreviewUrl(URL.createObjectURL(file)) // Önizleme
        setAnalysisResult(null) // Önceki sonucu temizle
    }

    const handleAnalyze = async () => {
        if (!selectedImage) {
            alert("Firstly upload a photo")
            return
        }

        setAnalyzePressed(true)

        const formData = new FormData()
        formData.append("image", selectedImage)

        try {
            setLoading(true)
            const response = await fetch("http://127.0.0.1:8000/analyze", {

                method: "POST",
                body: formData,
            })

            const result = await response.json()
            setAnalysisResult(result)
        }

        catch (error) {
            console.error("Analysis error:", error)
            setAnalysisResult({ error: "Server error"})
        }

        finally {
            setLoading(false)
        }
    }

    return (
        <div className="photo-container">
            <div className={`photo-box ${showPhoto ? "fade-in" : "fade-out"}`}>
            <h2 className='photo-title'>upload a photo</h2>

            <div className="button-group">
                <label htmlFor="file-upload" className="custom-file-upload">select</label>
                <input
                    id="file-upload"
                    type="file"
                    accept=".png,.jpeg,.jpg"
                    onChange={handleFileChange}
                    className="file-input-hidden"
                    />

                <button className="logout-button" onClick={onLogOut}>log out</button>
            </div>



            {previewUrl && (
            <div className={`preview-analyze-wrapper ${analyzePressed ? "shift-layout" : ""}`}>
                    <div className="preview-section">
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="preview-image"
                        />
                        <button className="analyze-button" onClick={handleAnalyze}>analyze</button>
                    </div>

                    {analyzePressed && (
                        <div className="analysis-section">
                            {loading && <p className="alayzing-text">analyzing...</p>}
                            {analysisResult && !analysisResult.error && (
                                <>
                                    <h3>analysis result:</h3>
                                    <ul>
                                        {Object.entries(
                                        [...(analysisResult.custom_model || []), ...(analysisResult.general_model || [])]
                                        .reduce((acc, item) => {
                                            acc[item.name] = (acc[item.name] || 0) + item.count
                                            return acc
                                        }, {})
                                        ).map(([name, count]) => (
                                        <li key={name}>number of {name} : {count}</li>
                                        ))}
                                    </ul>
                                </>
                            )}
                            {analysisResult && analysisResult.error && (
                                <p className="error-text">{analysisResult.error}</p>
                            )}
                        </div>
                    )}
                </div>
            )}



            </div>
        </div>
    )
}
export default Photo