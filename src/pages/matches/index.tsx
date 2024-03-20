// import MatchList from "./matchList";
import { useTranslation } from 'react-i18next';
import MatchList from "./matchList";

const Matches : React.FC = () => {
    const { t } = useTranslation()
    return (
        <>
        <div className=" w-full ">
            <br />
        <h1 className=" space-x-4 flex justify-between p-5  font-bold  bg-slate-400 rounded">
        {t("Matches")}
        </h1>
        <MatchList/>
        </div>
</>
    ) 
}
export default Matches;