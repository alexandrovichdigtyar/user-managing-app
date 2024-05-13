import { deleteItemIdAtom } from "@/state/store";
import { useDeleteUser } from "@/queries/users";
import { Grid } from "@mui/material";
import { useAtom } from "jotai";
import styled from "styled-components";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";

interface DeleteModalProps {
    userName: string;
}

const DeleteModal = ({ userName }: DeleteModalProps) => {
    const [deleteItemId, setdDleteItemId] = useAtom(deleteItemIdAtom);

    const title = `Do you want to delete user:  ${userName} ?`;

    const deleteUser = useDeleteUser();

    const onClose = () => setdDleteItemId(null);

    const onDeleteUser = async () => {
        await deleteUser.mutateAsync(deleteItemId as string);
        onClose();
    }

    return (
        <Modal onClose={onClose} title={title}>
            <ModalWrapper>
                <Grid item container xs={8} justifyContent="space-between" margin="0 auto">
                    <Grid item xs={4} mt={4}>
                        <Button variant="contained" type="button" title="Cancel" onClick={onClose} />
                    </Grid>
                    <Grid item xs={4} mt={4}>
                        <Button variant="contained" title="Delete" onClick={onDeleteUser} />
                    </Grid>
                </Grid>
            </ModalWrapper>
        </Modal>
    )
}

const ModalWrapper = styled('div')`
    max-width: 620px;
    max-height: 700px;
    overflow: auto;
    position: relative;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
    border-radius: 8px;
    width: 100%;
    padding-bottom: 40px;
`;

export default DeleteModal;