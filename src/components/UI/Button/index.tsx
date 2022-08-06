import React from 'react';
import cls from 'classnames';
import buttonStyle from './button.module.scss';
import Loading from '../Loading';
console.log(buttonStyle)
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  [x: string]: any;
  color?: string;
  onClick: (event: React.MouseEvent) => void;
  text?: boolean;
  dense?: boolean;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  size?: 'x-small' | 'small' | 'normal';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { onClick, color, text, dense, disabled, loading, children, className, size, ...otherProps } = props;
  return (
    <button
      ref={ref}
      onClick={onClick}
      className={cls(className, {
        [buttonStyle['bbs-btn']]: true,
        [buttonStyle[color + '-color']]: !!color && !color.startsWith('#'),
        [buttonStyle['bbs-btn-text']]: text,
        [buttonStyle['no-gap']]: dense,
        [buttonStyle['bbs-disabled']]: disabled,
        [buttonStyle['bbs-btn-loading']]: loading,
        [buttonStyle['bbs-btn-small']]: size === 'small',
        [buttonStyle['bbs-btn-xsmall']]: size === 'x-small',
      })}
      style={!!color && color.startsWith('#') ? { color: '#fff', backgroundColor: color } : {}}
      {...otherProps}
    >
      {loading ? <Loading size={22} /> : children}
    </button>
  );
});

export default React.memo(Button);
