import MatchItem from "./matchItem";

const Matches : React.FC = () => {
    return (
        <>
        <div>
        <h1 className=" space-x-4 flex justify-between  mx-auto max-w-screen-xl p-5">
        Live Matches 
        </h1>
        <MatchItem/>
        </div>
</>
    ) 
}
export default Matches;