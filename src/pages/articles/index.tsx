import ArticleList from "./articleList";

const Articles : React.FC = () => {

    

    return (
        <>
        <div className="w-full">
        <h1 className="space-x-4 flex justify-between  max-w-screen-xl p-5 font-bold bg-slate-400 rounded  ">
        Live news 
        </h1>
        <ArticleList/>
        
        </div>
</>
    ) 
}
export default Articles;