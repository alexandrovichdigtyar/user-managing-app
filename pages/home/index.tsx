import Button from "@/components/Button/Button"
import DataTable from "@/components/DataTable/DataTable"
import DeleteModal from "@/components/DeleteModal/DeleteModal"
import { apiURL, useUsers } from "@/queries/users"
import { AppRoutes, UserData } from "@/types/types"
import { Container, Typography } from "@mui/material"
import { QueryClient, dehydrate } from "@tanstack/react-query"
import axios from "axios"
import { useAtom } from "jotai"
import { useRouter } from "next/navigation"
import styled from "styled-components"
import { deleteItemIdAtom } from "../../src/state/store"

interface HomeProps {
    usersList: UserData[];
}

const Home = (props: HomeProps) => {
    const [deleteItemId, setdDleteItemId] = useAtom(deleteItemIdAtom);

    const { data } = useUsers(props.usersList);

    const router = useRouter();

    const toggleDeleteModal = (id: string | null) => setdDleteItemId(() => id);

    const onAddUser = () => router.push(`${AppRoutes.add}`);

    const columns = [
        {
            field: "id",
            label: "ID",
            width: 50
        },
        {
            field: "userName",
            label: "Username",
            width: 100,
            sortable: true,
        },
        {
            field: "email",
            label: "Email",
            width: 200,
        },
        {
            field: "name",
            label: "Name",
            width: 200
        },
        {
            field: "city",
            label: "City",
            width: 150
        },
    ]

    const actionColumns = [
        {
            label: "Edit",
            onClick: (id: string) => router.push(`${AppRoutes.edit}/${id}`),
        },
        {
            label: "Delete",
            onClick: (id: string) => toggleDeleteModal(id),
        }
    ]

    return (
        <ContainerWrapper>
            <Header>
                <Typography>
                    User List
                </Typography>
                <Button variant="contained" title="Add new" onClick={onAddUser} />
            </Header>
            <DataTable columns={columns} data={data} actionColumns={actionColumns} />
            {deleteItemId && (
                <DeleteModal userName={data.find((item: UserData) => item.id === deleteItemId)?.userName as string} />
            )}
        </ContainerWrapper>
    )
}

export async function getStaticProps() {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ['users'],
        queryFn: async () => {
            return (await axios.get(apiURL)).data;
        },
    });

    return {
        props: {
            usersList: dehydrate(queryClient).queries[0].state.data,
        },
    }
}

const Header = styled("div")`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0px;
`

const ContainerWrapper = styled(Container)`
`

export default Home;
