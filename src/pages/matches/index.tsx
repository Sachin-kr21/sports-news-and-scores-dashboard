// import MatchList from "./matchList";
import MatchList from "./matchList";

const Matches : React.FC = () => {
    return (
        <>
        <div className=" w-full ">
            <br />
        <h1 className=" space-x-4 flex justify-between p-5  font-bold  bg-slate-400 rounded">
        Matches 
        </h1>
        <MatchList/>
        </div>
</>
    ) 
}
export default Matches;