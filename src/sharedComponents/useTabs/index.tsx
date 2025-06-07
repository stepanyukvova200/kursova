import { useEffect, useState } from 'react';

import { Tab } from '../Tabs';

interface useTabsProps {
  tabs: Tab[];
  storageKey?: string;
  indexOfActiveTab: number;
}

const useTabs = ({ tabs, storageKey, indexOfActiveTab }: useTabsProps) => {
  const getInitialTab = () => {
    if (storageKey) {
      const savedTab = localStorage.getItem(storageKey);
      return savedTab ?? tabs[indexOfActiveTab]?.name;
    }

    return tabs[indexOfActiveTab]?.name;
  };

  const [activeTab, setActiveTab] = useState<string>(getInitialTab);

  const switchTab = (tabName: string) => setActiveTab(tabName);

  useEffect(() => {
    if (storageKey && activeTab) {
      localStorage.setItem(storageKey, activeTab);
    }
  }, [activeTab, storageKey]);

  return { activeTab, switchTab, tabs };
};

export default useTabs;
