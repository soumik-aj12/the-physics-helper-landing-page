type DropdownItem = {
    label: string;
    link: string;
};
export type BreadcrumbProps = {
    start: string;
    end: string;
    dropdownItems: DropdownItem[];
    startLink: string;
    endLink: string;
};

export type ContactProps = {
    mapLat: number;
    mapLng: number;
    address: string;
};

export type RegisterProps = {
    fullName: string;
    email: string;
    grade: number;
    password: string;
}

export type searchResultsProps = {
    rollNumber: string;
    name: string;
    class: string;
    exam: string;
    marks: number | null;
    grade: string;
    status: string;
    }