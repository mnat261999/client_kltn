import { Fragment, useEffect, useRef, useState } from 'react';
import { Button, Carousel, Col, Image, ImageProps, Modal, Row } from 'antd';
import classNames from 'classnames';

import './index.scss';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { CarouselRef } from 'antd/lib/carousel';

export interface IImage {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export interface IImageContentProps {
  images: IImage[];
  haveMore?: number;
}

export interface IThumbnailImageProps extends ImageProps {
  haveMore?: number;
}

const PostImages = ({ images }: IImageContentProps) => {
  let slider = useRef<CarouselRef | null>();

  const [visible, setVisible] = useState<boolean>(false);
  const [selected, setSelected] = useState<number>();

  useEffect(() => {
    if (selected !== undefined) {
      console.log(selected);
      slider.current?.goTo(selected);
    }
  }, [visible]);

  const ThumbnailImage = (props: IThumbnailImageProps) => {
    const { className, haveMore = 0, ...rest } = props;
    if (haveMore) {
      return (
        <div className="latest" onClick={props.onClick}>
          <Image className={classNames('oImage', className)} {...rest} preview={false} />
          <div className="overlay">
            <span>{haveMore}+</span>
          </div>
        </div>
      );
    }
    return <Image className={classNames('oImage', className)} {...rest} preview={false} />;
  };

  const Thumbnails = () => {
    switch (images.length) {
      case 1: {
        return (
          <ThumbnailImage
            onClick={() => {
              setVisible(true);
              setSelected(0);
            }}
            src={images[0].download_url}
            height={361}
          />
        );
      }
      case 2: {
        return (
          <Row className="two-images" gutter={3}>
            {images.map((image, index) => {
              return (
                <Col span={12}>
                  <ThumbnailImage
                    onClick={() => {
                      setVisible(true);
                      setSelected(index);
                    }}
                    src={image.download_url}
                    height={361}
                  />
                </Col>
              );
            })}
          </Row>
        );
      }
      case 3: {
        return (
          <Row className="three-images" gutter={3}>
            <Col span={12}>
              <ThumbnailImage
                onClick={() => {
                  setVisible(true);
                  setSelected(0);
                }}
                src={images[0].download_url}
                height={361}
              />
            </Col>
            <Col span={12}>
              <ThumbnailImage
                onClick={() => {
                  setVisible(true);
                  setSelected(1);
                }}
                src={images[1].download_url}
                height={178}
              />
              <ThumbnailImage
                onClick={() => {
                  setVisible(true);
                  setSelected(2);
                }}
                src={images[2].download_url}
                height={178}
              />
            </Col>
          </Row>
        );
      }
      default: {
        return (
          <Row className="multiple-images" gutter={3}>
            {images.slice(0, 4).map((image, index) => {
              return (
                <Col span={index ? 8 : 24}>
                  <ThumbnailImage
                    onClick={() => {
                      setVisible(true);
                      setSelected(index);
                    }}
                    src={image.download_url}
                    height={index ? 115 : 350}
                    haveMore={index === 3 ? images.length - 4 : 0}
                  />
                </Col>
              );
            })}
          </Row>
        );
      }
    }
  };

  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  return (
    <Fragment>
      <div className={'thumbnails'}>
        <Thumbnails />
      </div>
      <Modal className={'images-modal'} width={1024} visible={visible} footer={null} onCancel={() => setVisible(false)}>
        <Carousel
          ref={(ref) => {
            slider.current = ref;
          }}
          dots={false}
          afterChange={onChange}
          arrows
          prevArrow={
            <div>
              <LeftOutlined />
            </div>
          }
          nextArrow={
            <div>
              <RightOutlined />
            </div>
          }
          slickGoTo={selected}
        >
          {images.map((image) => {
            return (
              <div>
                <Image src={image.download_url} preview={false} />
              </div>
            );
          })}
        </Carousel>
      </Modal>
    </Fragment>
  );
};

export default PostImages;
