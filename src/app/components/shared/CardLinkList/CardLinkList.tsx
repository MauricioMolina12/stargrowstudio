'use client'

interface Item {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: boolean;
  badge?: string;
}

interface CardLinkListProps {
  title?: string;
  items: Item[];
}

export const CardLinkList = ({ title, items }: CardLinkListProps) => {
  return (
    <div>
      {title && <h3 className="font-semibold text-sm text-gray-500 mb-4">{title}</h3>}
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li
            key={idx}
            className={`p-3 rounded-md cursor-pointer hover:bg-indigo-50`}
          >
            <div className="flex items-start gap-3">
              {item.icon}
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[12px]">{item.title}</span>
                  {item.badge && (
                    <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className="text-[12px] text-gray-500">{item.description}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
