import figma from "@figma/code-connect";
import { Modal, ModalTrigger } from "./Modal";
import { Button } from "../Button/Button";

/**
 * Code Connect mapping for Figma `Modal/Recommended` (node 11:30).
 *
 * Modal in Figma is a single layout with no variant axes — the snippet shown
 * below mirrors the canonical `<ModalTrigger>` + `<Modal>` composition.
 */
figma.connect(
  Modal,
  "https://www.figma.com/design/vMAQsMSeIcoHMumNzKLeaQ/?node-id=11-30",
  {
    props: {},
    example: () => (
      <ModalTrigger>
        <Button>Open</Button>
        <Modal title="Confirm" onConfirm={() => {}}>
          Are you sure?
        </Modal>
      </ModalTrigger>
    ),
  },
);
