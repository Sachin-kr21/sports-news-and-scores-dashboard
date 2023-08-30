// import MatchList from "./matchList";
import MatchList from "./matchList";

const Matches : React.FC = () => {
    return (
        <>
        <div>
        <h1 className=" space-x-4 flex justify-between  max-w-screen-xl p-5 font-bold">
        Live Matches 
        </h1>
        <MatchList/>
        </div>
</>
    ) 
}
export default Matches;