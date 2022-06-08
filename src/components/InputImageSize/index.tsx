import { useEffect, useState } from 'react';
import { Input, InputNumber, Row, Col } from 'antd';

interface IInputImageSizeProps {
  initialValues?: {
    width: number | undefined;
    height: number | undefined;
  };
  onChange?: Function;
}

export default function InputImageSize(props: IInputImageSizeProps) {
  const [width, setWidth] = useState<number | undefined>(0);
  const [height, setHeight] = useState<number | undefined>(0);

  useEffect(() => {
    if (props.onChange) {
      props.onChange(width, height);
    }
  }, [width, height]);

  useEffect(() => {
    if (props.initialValues) {
      setWidth(props.initialValues?.width);
      setHeight(props.initialValues?.height);
    }
  }, [props.initialValues]);

  return (
    <Row justify="start">
      <Col>
        <InputNumber
          className="left"
          style={{
            zIndex: 2,
            textAlign: 'center',
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }}
          placeholder="Width"
          defaultValue={props.initialValues?.width}
          onChange={(value: number) => setWidth(value)}
        />
      </Col>
      <Col>
        <Input
          style={{
            zIndex: 1,
            width: 30,
            borderLeft: 0,
            borderRight: 0,
            borderRadius: 0,
            pointerEvents: 'none',
          }}
          placeholder={'x'}
          disabled
        />
      </Col>
      <Col>
        <InputNumber
          style={{
            zIndex: 2,
            textAlign: 'center',
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }}
          placeholder="Height"
          defaultValue={props.initialValues?.height}
          onChange={(value: number) => setHeight(value)}
        />
      </Col>
    </Row>
  );
}
