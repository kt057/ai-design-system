import { forwardRef } from "react";
import {
  Modal as AriaModal,
  ModalOverlay,
  Dialog,
  Heading,
  DialogTrigger as AriaDialogTrigger,
  type ModalOverlayProps,
  type DialogTriggerProps as AriaDialogTriggerProps,
} from "react-aria-components";
import { cn } from "@/utils/cn";
import { Button } from "../Button/Button";

const overlayClass = cn(
  "fixed inset-0 z-50 flex items-center justify-center",
  "bg-black/40",
  "data-[entering]:animate-in data-[entering]:fade-in",
  "data-[exiting]:animate-out data-[exiting]:fade-out",
);

const modalClass = cn(
  "bg-bg-default rounded-lg shadow-lg",
  "w-[440px] max-w-[90vw]",
  "outline-none",
  "data-[entering]:animate-in data-[entering]:fade-in data-[entering]:zoom-in-95",
  "data-[exiting]:animate-out data-[exiting]:fade-out data-[exiting]:zoom-out-95",
);

export interface ModalProps extends Omit<ModalOverlayProps, "className" | "children"> {
  /** Heading at the top of the modal. */
  title: React.ReactNode;
  /** Optional subtitle below the title. */
  subtitle?: React.ReactNode;
  /** Body content (any node). */
  children?: React.ReactNode;
  /** Cancel button label. Hides the cancel button when set to `null`. */
  cancelLabel?: React.ReactNode;
  /** Confirm button label. Hides the confirm button when set to `null`. */
  confirmLabel?: React.ReactNode;
  /** Fires when the user clicks Cancel. The modal also closes. */
  onCancel?: () => void;
  /** Fires when the user clicks Confirm. The modal also closes. */
  onConfirm?: () => void;
  /** Override or extend the modal Tailwind class list. */
  className?: string;
}

/**
 * Centered confirmation dialog. Built on `react-aria-components`'s
 * `<ModalOverlay>` + `<Modal>` + `<Dialog>` so focus trap, scroll lock,
 * Escape-to-close, and click-outside-to-dismiss are wired automatically.
 *
 * @example
 * ```tsx
 * <ModalTrigger>
 *   <Button>Open</Button>
 *   <Modal title="Confirm" onConfirm={save}>Are you sure?</Modal>
 * </ModalTrigger>
 * ```
 */
export const Modal = forwardRef<HTMLDivElement, ModalProps>(function Modal(
  {
    title,
    subtitle,
    children,
    cancelLabel = "Cancel",
    confirmLabel = "Confirm",
    onCancel,
    onConfirm,
    className,
    ...rest
  },
  ref,
) {
  return (
    <ModalOverlay {...rest} className={overlayClass}>
      <AriaModal ref={ref} className={cn(modalClass, className)}>
        <Dialog className="outline-none" role="dialog">
          {({ close }) => (
            <>
              <div className="flex flex-col gap-1 px-5 pt-5 pb-2">
                <Heading slot="title" className="text-text-primary text-lg font-semibold">
                  {title}
                </Heading>
                {subtitle ? <p className="text-text-secondary text-sm">{subtitle}</p> : null}
              </div>
              <div className="text-text-primary px-5 pt-2 pb-4 text-base">{children}</div>
              {cancelLabel || confirmLabel ? (
                <div className="border-border-default flex justify-end gap-1 border-t px-5 pt-4 pb-5">
                  {cancelLabel ? (
                    <Button
                      variant="secondary"
                      size="sm"
                      onPress={() => {
                        onCancel?.();
                        close();
                      }}
                    >
                      {cancelLabel}
                    </Button>
                  ) : null}
                  {confirmLabel ? (
                    <Button
                      variant="primary"
                      size="sm"
                      onPress={() => {
                        onConfirm?.();
                        close();
                      }}
                    >
                      {confirmLabel}
                    </Button>
                  ) : null}
                </div>
              ) : null}
            </>
          )}
        </Dialog>
      </AriaModal>
    </ModalOverlay>
  );
});

/** Wraps a trigger button and a `<Modal>` to manage open state. */
export const ModalTrigger = (props: AriaDialogTriggerProps) => <AriaDialogTrigger {...props} />;

export type ModalTriggerProps = AriaDialogTriggerProps;
