import { useEffect, useRef, useState } from 'react';
import { Input, InputNumber, Row, Col } from 'antd';

interface IInputTiltRangeProps {
  initialValues?: {
    min: number | undefined;
    max: number | undefined;
  };
  onChange?: Function;
}

export default function InputTiltRange(props: IInputTiltRangeProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const minRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const maxRef = useRef<any>(null);

  const [min, setMin] = useState<number | undefined>(0);
  const [max, setMax] = useState<number | undefined>(0);

  useEffect(() => {
    if (props.onChange) {
      props.onChange(min, max);
    }
  }, [min, max]);

  useEffect(() => {
    if (props.initialValues) {
      setMin(props.initialValues?.min);
      setMax(props.initialValues?.max);
    }
  }, [props.initialValues]);

  return (
    <Row justify="start">
      <Col>
        <InputNumber
          ref={minRef}
          className="left"
          style={{
            zIndex: 2,
            textAlign: 'center',
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }}
          placeholder="Min"
          defaultValue={props.initialValues?.min}
          onChange={(value: number) => {
            setMin(value);
          }}
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
          placeholder={'-'}
          disabled
        />
      </Col>
      <Col>
        <InputNumber
          ref={maxRef}
          style={{
            zIndex: 2,
            textAlign: 'center',
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }}
          placeholder="Max"
          defaultValue={props.initialValues?.max}
          onChange={(value: number) => {
            setMax(value);
          }}
        />
      </Col>
    </Row>
  );
}
