import { useNavigate } from "react-router-dom"
import { Button } from "../components/button";

export const Landing = () => {
    const navigate = useNavigate();
    return <div className="flex justify-center">
        <div className="pt-8 max-w-screen-lg">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex justify-center">
                    <img src={"/chessboard.png"} className="max-w-96"/>
                </div>
                <div className="pt-10">
                    <div className="flex justify-center">
                        <h1 className="text-4xl font-bold text-white">Play chess online</h1>
                    </div>
                    <div className=" flex justify-center mt-8">
                        <Button onClick={() => {
                            navigate('/game')
                        }} >
                            Play Online
                        </Button>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
}