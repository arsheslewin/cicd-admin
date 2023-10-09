import type { ChangeEvent, FC, FocusEvent } from 'react';
import type { ControllerRenderProps } from 'react-hook-form';

import { Input } from 'antd';
import type { PasswordProps } from 'antd/lib/input';

import { LENGTH_CONSTANTS } from 'constant';
import IconEye from 'resources/svg/IconEye';
import IconEyeClose from 'resources/svg/IconEyeClose';

type ITextInputPassword = {
  field?: ControllerRenderProps<any, string>;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  maxLength?: number;
};

const TextInputPassword: FC<PasswordProps & ITextInputPassword> = ({
  field,
  onChange,
  onBlur,
  maxLength = LENGTH_CONSTANTS.MAX_LENGTH_INPUT,
  ...props
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    field?.onChange(e);
    if (onChange) onChange(e);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const value = e?.target?.value?.replace(/\s/g, '');
    if (value !== field?.value) field?.onChange(value);

    field?.onBlur();
    if (onBlur) onBlur(e);
  };

  return (
    <Input.Password
      {...field}
      id={field?.name}
      maxLength={maxLength}
      onChange={handleChange}
      onBlur={handleBlur}
      iconRender={(visible) => <span>{visible ? <IconEye /> : <IconEyeClose />}</span>}
      {...props}
    />
  );
};

export default TextInputPassword;
