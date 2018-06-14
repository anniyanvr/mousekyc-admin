import React, { PureComponent } from 'react'; 
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { Icon, Row, Col, Button, Layout } from 'antd';
import logo from 'assets/img/logo.png';
import { connectAuth, authActionCreators } from 'core';
import { promisify } from '../../utilities';
import UploadDocument from '../../components/UploadDocument/UploadDocument';

const { Content, Header} = Layout;

class UploadSelfieContainer extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      imgSrc: ''
    }
  }

  showTakePhotoPage = () => {
    this.props.history.push('take_photo', {uploadType: 'selfie'});
  }

  onChooseImage = (imgSrc) => {
    this.setState(...this.state, {imgSrc: imgSrc});
  }

  uploadDocument = () => {
    if (this.state.imgSrc !== '' && this.props.user) {
      promisify(this.props.updateSelfie, { 
        token: this.props.user.token,
        selfie: this.state.imgSrc
      })
        .then((userInfo) => {
          console.log(userInfo);
        })
        .catch(e => console.log(e));
    }
  }

  back = () => {
    this.props.history.goBack();
  }

  render () {
    return (
      <div className="block">
        <Layout>
          <Header className="header">
            <div onClick={this.back}>
              <Icon style={{ fontSize: 16 }} type="arrow-left" /> <span>BACK</span>
            </div>
          </Header>
          <Layout>
            <Content className="main">
              <Row className="validation_logo_area">
                <Col span={5} offset={5}>
                  <img alt="true" src={logo} className="logo"/>
                </Col>
                <Col span={12} className="title_area">
                  <Row className="row_title"><Col><span  className="logo_title">NO REST</span></Col></Row>
                  <Row className="row_title"><Col><span className="logo_title">LABS</span></Col></Row>
                </Col>
              </Row>
              <Row  className="validation_title_area">
                <Col span={12} offset={6}>
                    <span className="validation_choose_title">&ensp;Upload&ensp;Selfie</span>
                </Col>
              </Row>
              <Row className="upload_area">
                <Col offset={4} span={16}>
                  <UploadDocument onChooseImage={(imgSrc) => this.onChooseImage(imgSrc)} />
                </Col>
              </Row>
              <Row className="upload_btn_area">
                <Col className="take_area" offset={4} span={8}>
                  <Button className="take_btn" onClick={this.showTakePhotoPage}>Take a Picture<Icon style={{ fontSize: 16, color: '#ffffff'}} type="camera" /></Button>
                </Col>
                <Col className="preview_area" span={8}>
                  <Button className="preview_btn">Preview<Icon style={{ fontSize: 16, color: '#ffffff'}} type="eye" /></Button>
                </Col>
              </Row>
              <Row>
                <Col offset={4} span={16}>
                  <Button className={this.state.imgSrc === '' ? "continue_btn" : "continue_enable_btn"} disabled={this.state.imgSrc === '' ? true : false} onClick={this.uploadDocument}>NEXT</Button>
                </Col>
              </Row>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }  
}

const mapStateToProps = ({auth}) => ({
  user: auth.user,
});

const mapDisptachToProps = (dispatch) => {
  const {
    updateSelfie
  } = authActionCreators

  return bindActionCreators({
    updateSelfie
  }, dispatch);
}

export default compose(
  connectAuth(mapStateToProps, mapDisptachToProps),
)(UploadSelfieContainer);