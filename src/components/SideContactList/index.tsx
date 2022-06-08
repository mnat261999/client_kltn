import { Typography } from "antd";
import UserBar, { IUserBarProps } from "components/UserBar";

import './index.scss';

const { Text } = Typography;

export default function SideContactList() {
  const mockTexts = 'Bacon ipsum dolor amet buffalo brisket tail drumstick fatback pork belly chicken burgdoggen pork chop prosciutto. Porchetta picanha chuck chislic cow corned beef. Bresaola ball tip kielbasa, kevin filet mignon porchetta shankle tongue pig short ribs chuck ham pork chop beef ribs meatball. Biltong burgdoggen shoulder turkey tri-tip kevin ham ground round. Frankfurter boudin tongue, drumstick venison sirloin alcatra tail pork chop fatback brisket kevin buffalo shank.';
  const textSplitter = mockTexts.split(' ');
  const mockFriends: IUserBarProps[] = new Array(35).fill(0).map((_, index) => {
    return {
      avatar: 'https://joeschmoe.io/api/v1/random',
      name: textSplitter[index] ? `${textSplitter[index]} ${textSplitter[index + 1]}` : 'test'
    }
  })

  return (
    <div className="side-contact-list">
      <Text style={{ fontWeight: 500 }}>Following</Text>
      {
        mockFriends.map(({avatar, name}) => {
          return <UserBar avatar={avatar} name={name} />
        })
      }
    </div>
  );
}
