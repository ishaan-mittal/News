import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let {title,description,imageUrl,newsUrl,author,date,source}=this.props;
    return (
      <div className="container" >
        <div className="card" style={{width:"18rem"}} >
        <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{zIndex:'1' , left:"90%"}}>
        {source}
    <span className="visually-hidden">unread messages</span>
  </span>
       <img src={!imageUrl?"https://static.toiimg.com/thumb/msid-89402036,width-1070,height-580,imgsize-55562,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg":imageUrl} className="card-img-top" alt="..." />
      <div className="card-body" >
        <h5 className="card-title">{title}</h5>
        <p className="card-text" >{description}</p>
        <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} at {new Date(date).toGMTString()}</small></p>
        <a href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
      </div>
</div>
      </div>
    )
  }
}

export default NewsItem

