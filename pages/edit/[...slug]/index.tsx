import EditModal from "@/components/EditModal/EditModal";

interface EditProps {
    slug: string;
}

const Edit = ({ slug }: EditProps) => (
    <EditModal itemId={slug} />
);

export async function getServerSideProps({ params }: {
    params: {
        slug: string[]
    }
}) {
    return {
        props: {
            slug: params.slug[0],
        },
    };
}

export default Edit;
