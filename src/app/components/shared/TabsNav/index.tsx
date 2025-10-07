
type Tab = {
    label: string;
    key: string;
}

type TabsNavProps = {
    tabs: Tab[];
    tabActive: string;
    setTabActive: (key: string) => void;
};

export default function TabsNav({ tabs, tabActive, setTabActive }: TabsNavProps) {
    return(
        <nav className="tabs w-full h-20 overflow-x-auto flex items-center gap-4 p-2">
                {tabs.map((tab) => (
                    <button key={tab.key} onClick={() => setTabActive(tab.key)} className="parallax relative cursor-pointer text-gray-600 text-[1rem]" style={{
                        color: tabActive === tab.key ? 'var(--color-primary)' : 'initial',
                        fontWeight: tabActive === tab.key ? 'bold' : '300'
                    }}
                    >{tab.label}
                        {tabActive === tab.key && (
                            <span className="line-active absolute left-0 bottom-0 w-full h-0.5 bg-[var(--color-primary)]"></span>
                        )}
                    </button>
                ))}
            </nav>
    )
}