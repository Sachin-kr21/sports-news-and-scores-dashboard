import ArticleList from "./articleList";

const Articles : React.FC = () => {

    

    return (
        <>
        <div>
        <h1 className="space-x-4 flex justify-between  max-w-screen-xl p-5 font-bold  ">
        Articles 
        </h1>
        <ArticleList/>
        </div>
</>
    ) 
}
export default Articles;