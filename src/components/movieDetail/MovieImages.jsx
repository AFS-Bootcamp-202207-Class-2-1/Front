import { Row, Col, Image } from 'antd'
import React from 'react'
import detail_images_icon from '../../assets/iconfont/detail_images_icon.png'

function MovieImages(props) {
    const {movie} = props;

    return (
        <div>
            <div className="movie-images-header">
                <img src={detail_images_icon} alt="logo" className="movie-images-icon"/>
                <h4>相关图片</h4>
            </div>
            {
                 movie.length !== 0 && ( movie.detailImages.length !== 0 && 
                    (
                    <div className="movie-images-body">
                    <Row style={{height: "293px"}}>
                        <Col span={15} align="right">
                            <Image src={movie.detailImages[0].detailImageUrl} className="large-image"/>
                            {/* <img src={movie_detail_cover} alt="images" className="large-image"/> */}
                        </Col>
                        <Col span={9} >
                            <Row style={{height: "146.5px"}}>
                                <Col span={12} align="center">
                                    <Image src={movie.detailImages[1].detailImageUrl} alt="images" className="small-image" />
                                </Col>
                                <Col span={12}>
                                    <Image src={movie.detailImages[2].detailImageUrl} alt="images" className="small-image"/>
                                </Col>
                            </Row>
                            <Row style={{height: "146.5px"}} align="bottom">
                                <Col span={12} align="center">
                                    <Image src={movie.detailImages[3].detailImageUrl} alt="images" className="small-image"/>
                                </Col>
                                <Col span={12}>
                                    <Image src={movie.detailImages[4].detailImageUrl} alt="images" className="small-image"/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
                )
                    
                )
            }
        </div>
    )
}

export default MovieImages
