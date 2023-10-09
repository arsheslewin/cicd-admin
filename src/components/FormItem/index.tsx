import { Children, cloneElement, FC, isValidElement, memo, PropsWithChildren, ReactNode } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { ErrorMessage } from '@hookform/error-message';
import cx from 'classnames';

const FormItem: FC<
  PropsWithChildren<{
    name: string;
    label?: string | ReactNode;
    labelClassName?: string;
    required?: boolean;
    labelTooltip?: ReactNode;
    helpText?: ReactNode;
    description?: ReactNode;
    containerClassName?: string;
    showError?: boolean;
    errorClassName?: string;
    horizontal?: boolean;
  }>
> = ({
  name,
  label,
  labelClassName,
  required,
  labelTooltip,
  helpText,
  description,
  containerClassName,
  showError = true,
  errorClassName,
  horizontal = false,
  children,
  ...props
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div
      className={cx(containerClassName, 'form-item', {
        'has-error': errors?.[name],
        'form-item--horizontal': horizontal,
      })}
    >
      {label && (
        <div className={cx(labelClassName, 'form-item__label', 'mb-12')}>
          {label}
          {required ? <span className='addon-after--required'> *</span> : ''} {labelTooltip ?? ''}
        </div>
      )}
      {description && <div className={cx(labelClassName, 'form-item__description', 'mb-12')}>{description}</div>}

      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          // Element is HTML
          if (typeof child?.type === 'string') return child;

          // Element is React Element
          return (
            <Controller
              name={name}
              control={control}
              render={({ field }) =>
                cloneElement<any>(child, {
                  field,
                  ...props,
                })
              }
            />
          );
        }
        return null;
      })}

      {showError && (
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => <div className={cx('error-text', errorClassName)}>{message}</div>}
        />
      )}
    </div>
  );
};

export default memo(FormItem);
