import React, { forwardRef } from "react";
import { cva } from "class-variance-authority";

export const Button = forwardRef(
  ({ className, variant, size, ...props }, ref) => {
    const buttonVariants = cva(
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
      {
        variants: {
          variant: {
            default: "bg-blue-500 text-white hover:bg-blue-600",
            destructive: "bg-red-500 text-white hover:bg-red-600",
            outline:
              "border border-input hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-gray-700 text-white hover:bg-gray-600",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "underline-offset-4 hover:underline text-blue-500",
          },
          size: {
            default: "h-10 py-2 px-4",
            sm: "h-9 px-3 rounded-md",
            lg: "h-11 px-8 rounded-md",
          },
        },
        defaultVariants: {
          variant: "default",
          size: "default",
        },
      }
    );

    return (
      <button
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export const Input = forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={`flex h-10 w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export const Select = forwardRef(({ className, options, ...props }, ref) => {
  return (
    <select
      className={`flex h-10 w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
      ref={ref}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
});


Select.displayName = "Select";

export const Card = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`rounded-lg border border-gray-700 bg-gray-800 text-gray-100 shadow-sm ${className}`}
    {...props}
  />
));

Card.displayName = "Card";

export const CardHeader = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`flex flex-col space-y-1.5 p-6 ${className}`}
    {...props}
  />
));

CardHeader.displayName = "CardHeader";

export const CardTitle = forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={`text-2xl font-semibold leading-none tracking-tight text-blue-400 ${className}`}
    {...props}
  />
));

CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={`text-sm text-gray-400 ${className}`} {...props} />
));

CardDescription.displayName = "CardDescription";

export const CardContent = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
));

CardContent.displayName = "CardContent";

export const CardFooter = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`flex items-center p-6 pt-0 ${className}`}
    {...props}
  />
));

CardFooter.displayName = "CardFooter";

export const Label = forwardRef(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-300 ${className}`}
    {...props}
  />
));

Label.displayName = "Label";

export const Avatar = forwardRef(({ className, src, alt, ...props }, ref) => (
  <div ref={ref} className={`relative w-10 h-10 ${className}`}>
    <img
      src={src}
      alt={alt}
      className="rounded-full object-cover w-full h-full"
      {...props}
    />
  </div>
));

Avatar.displayName = "Avatar";

export const Badge = forwardRef(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default: "bg-blue-500 text-white",
      secondary: "bg-gray-700 text-white",
      destructive: "bg-red-500 text-white",
      outline: "text-gray-300 border border-gray-600",
    };

    return (
      <div
        ref={ref}
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variants[variant]} ${className}`}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

export const Alert = forwardRef(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default: "bg-gray-700 text-gray-100",
      destructive: "bg-red-900 text-red-100 border-red-700",
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={`rounded-lg border p-4 ${variants[variant]} ${className}`}
        {...props}
      />
    );
  }
);

Alert.displayName = "Alert";

export const AlertTitle = forwardRef(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={`mb-1 font-medium leading-none tracking-tight ${className}`}
    {...props}
  />
));

AlertTitle.displayName = "AlertTitle";

export const AlertDescription = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`text-sm [&_p]:leading-relaxed ${className}`}
    {...props}
  />
));

AlertDescription.displayName = "AlertDescription";

export const FormGroup = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`space-y-2 ${className}`} {...props} />
));

FormGroup.displayName = "FormGroup";

export const Spinner = ({ className, ...props }) => (
  <svg
    className={`animate-spin h-5 w-5 text-white ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

export const Modal = ({ isOpen, onClose, children, className = "" }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        ></div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className={`inline-block align-bottom bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${className}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export const Tooltip = ({ children, content, className = "" }) => {
  return (
    <div className="relative group">
      {children}
      <div
        className={`absolute z-10 invisible group-hover:visible bg-gray-700 text-white text-sm rounded py-1 px-2 bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 ${className}`}
      >
        {content}
        <svg
          className="absolute text-gray-700 h-2 w-full left-0 top-full"
          x="0px"
          y="0px"
          viewBox="0 0 255 255"
        >
          <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
        </svg>
      </div>
    </div>
  );
};

export const Textarea = forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={`flex min-h-[80px] w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";