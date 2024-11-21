import PropTypes from "prop-types";

import cn from "classnames";

function Drawer({ isOpen, className, children, onClose }) {
  return (
        <div className={cn("fixed top-0 bottom-0 right-0 bg-slate-500 z-10 transition-all", className, 
            {'translate-x-0' : isOpen},
            {'translate-x-full hidden' : !isOpen}
        )}>
          <button onClick={onClose}>X</button>
          {children}
        </div>
  );
}

Drawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default Drawer;
