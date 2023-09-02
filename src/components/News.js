import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
  
static defaultProps={
   country:"in",
   pageSize:8,
   category:"general"
};
static propTypes={

  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string
};

capitalize=(word)=>
{
 return word.charAt(0).toUpperCase()+word.slice(1);
}

  constructor(props)
  {
    super(props);
    this.state={
      articles1:[],
      page:1,
      loading:false
    }
    document.title=`${this.capitalize(this.props.category)}-NEWS`
  }

  async componentDidMount()
  {
    
    this.setState({
      loading:true
    })
    this.props.setprogress(0)
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8c20a5aaa2a5419bae3df4b0ebe5050f&page=1&pagesize=${this.props.pageSize}`;
    this.props.setprogress(30);
    let data=await fetch(url);
    this.props.setprogress(45);
    let parsedData=await data.json();
    this.props.setprogress(70);
    this.setState({articles1:parsedData.articles,totalResults:parsedData.totalResults,loading:false}
      );
      this.props.setprogress(100);
  }
  
  previousClick=async ()=>
  {
    console.log("prev")
  
    this.props.setprogress(30)
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8c20a5aaa2a5419bae3df4b0ebe5050f&page=${this.state.page-1}&pagesize=${this.props.pageSize}`;
    this.setState({
      loading:true
    })
    this.props.setprogress(45);
    let data=await fetch(url);
    let parsedData=await data.json();
    this.props.setprogress(70);
    this.setState({
      articles1:parsedData.articles,
      page:this.state.page-1,
      loading:false
  }
    )
    this.props.setprogress(100);
}
   
  nextClick= async ()=>
  {
    console.log("next")
    this.props.setprogress(0);
    if(!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)))
  {
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8c20a5aaa2a5419bae3df4b0ebe5050f&page=${this.state.page+1}&pagesize=${this.props.pageSize}`;
    this.setState({
      loading:true
    })
    
    let data=await fetch(url);
    this.props.setprogress(45);
    let parsedData=await data.json();
    this.props.setprogress(70);
    this.setState({
      articles1:parsedData.articles,
      page:this.state.page+1,
      loading:false
    })
  
  }
  this.props.setprogress(100);
}
  render() {
    return (
      <div className="container my-3"  >
        <h2 className="text-center" style={{marginTop:"70px" }}>
          News- Top {this.capitalize(this.props.category)} headlines
        </h2>
        {this.state.loading&&<Spinner/>}
       
        <div className="row" >
    {!this.state.loading && this.state.articles1.map((element)=>{
     return  <div className="col-md-4" key={element.url} >

<NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
</div>
    })}
  


        </div>

        <div className="container d-flex justify-content-between">

        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.previousClick}>   &#8592; previous</button>
        <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" className="btn btn-dark"onClick={this.nextClick}>  &#8594; next</button>
        </div>
    
      </div>
    
    )
}
}

export default News
