import {
  LikeOutlined,
  ShareAltOutlined,
  EllipsisOutlined,
  LinkOutlined,
  SmileOutlined,
  SendOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Card, Col, Comment, Image, Input, Row, Space, Tooltip, Typography } from 'antd';
import CustomComment from 'components/Comment';
import CommentInput from 'components/CommentInput';
import PostActions from 'components/PostActions';
import PostImages from 'components/PostImages';
import moment from 'moment';

const { Text } = Typography;

const mockImages = [
  {
    id: '1003',
    author: 'E+N Photographies',
    width: 1181,
    height: 1772,
    url: 'https://unsplash.com/photos/GYumuBnTqKc',
    download_url: 'https://picsum.photos/id/1003/1181/1772',
  },
  {
    id: '0',
    author: 'Alejandro Escamilla',
    width: 5616,
    height: 3744,
    url: 'https://unsplash.com/photos/yC-Yzbqy7PY',
    download_url: 'https://picsum.photos/id/0/5616/3744',
  },
  {
    id: '1',
    author: 'Alejandro Escamilla',
    width: 5616,
    height: 3744,
    url: 'https://unsplash.com/photos/LNRyGwIJr5c',
    download_url: 'https://picsum.photos/id/1/5616/3744',
  },
  {
    id: '10',
    author: 'Paul Jarvis',
    width: 2500,
    height: 1667,
    url: 'https://unsplash.com/photos/6J--NXulQCs',
    download_url: 'https://picsum.photos/id/10/2500/1667',
  },
  {
    id: '100',
    author: 'Tina Rataj',
    width: 2500,
    height: 1656,
    url: 'https://unsplash.com/photos/pwaaqfoMibI',
    download_url: 'https://picsum.photos/id/100/2500/1656',
  },
  {
    id: '1000',
    author: 'Lukas Budimaier',
    width: 5626,
    height: 3635,
    url: 'https://unsplash.com/photos/6cY-FvMlmkQ',
    download_url: 'https://picsum.photos/id/1000/5626/3635',
  },
  {
    id: '1001',
    author: 'Danielle MacInnes',
    width: 5616,
    height: 3744,
    url: 'https://unsplash.com/photos/1DkWWN1dr-s',
    download_url: 'https://picsum.photos/id/1001/5616/3744',
  },
  {
    id: '1002',
    author: 'NASA',
    width: 4312,
    height: 2868,
    url: 'https://unsplash.com/photos/6-jTZysYY_U',
    download_url: 'https://picsum.photos/id/1002/4312/2868',
  },
];

const PostCard = () => {
  return (
    <div className="post-card">
      <Card
        title={
          <Row align="middle" justify="start" gutter={16}>
            <Col>
              <Avatar src={'https://i.pravatar.cc/300'} size={44} />
            </Col>
            <Col>
              <Text className="name">Lorem Ipsum</Text>
              <br />
              <small className="date">{moment().format('DD MMM YYYY')}</small>
            </Col>
          </Row>
        }
        bordered={false}
        extra={<Button type="text" shape="circle" icon={<EllipsisOutlined />} />}
      >
        <p>
          Bacon ipsum dolor amet buffalo brisket tail drumstick fatback pork belly chicken burgdoggen pork chop
          prosciutto. Porchetta picanha chuck chislic cow corned beef. Bresaola ball tip kielbasa, kevin filet mignon
          porchetta shankle tongue pig short ribs chuck ham pork chop beef ribs meatball. Biltong burgdoggen shoulder
          turkey tri-tip kevin ham ground round. Frankfurter boudin tongue, drumstick venison sirloin alcatra tail pork
          chop fatback brisket kevin buffalo shank.
        </p>
        <p>
          Cow jerky short ribs alcatra ball tip. Pork belly corned beef sausage biltong shankle shank. Jerky flank
          kielbasa tongue ball tip sausage beef ribs picanha. Prosciutto salami turducken sausage, drumstick doner beef
          ham short ribs hamburger corned beef kevin shoulder landjaeger porchetta. Tenderloin short loin chuck, swine
          burgdoggen drumstick ham hock porchetta.
        </p>
        <PostImages images={mockImages} />
      </Card>
      <div className="actions">
        <PostActions postId={'123'} numberOfLikes={4} numberOfComments={12} numberOfShares={2} />
      </div>
      <div className="comments">
        <CustomComment
          id={'asd'}
          content={'Bacon ipsum dolor amet salami alcatra turducken flank filet mignon bacon short loin capicola.'}
          numberOfLike={23}
        />
        <CommentInput />
      </div>
    </div>
  );
};

export default PostCard;
