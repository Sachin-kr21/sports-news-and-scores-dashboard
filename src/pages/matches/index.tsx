// import MatchList from "./matchList";
import MatchList from "./matchList";

const Matches : React.FC = () => {
    // localStorage.setItem("sachin","ruby");
    // console.log(localStorage.getItem("sachin"));
    // localStorage.removeItem("sachin");
    return (
        <>
        <div className=" w-full ">
            <br />
        <h1 className=" space-x-4 flex justify-between p-5   font-bold  bg-slate-400 rounded">
        Live Matches 
        </h1>
        <MatchList/>
        </div>
</>
    ) 
}
export default Matches;