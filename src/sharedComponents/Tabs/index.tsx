import React, { DetailedReactHTMLElement, forwardRef, HTMLAttributes, useImperativeHandle, useState } from 'react';
import './tabs.scss';

import useTabs from '../useTabs';
// import { useAppSelector } from '@/redux/hooks';
import { Box } from '@mui/material';
import clsx from 'clsx';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { Button } from 'reactstrap';

export interface Tab {
  readonly name: string;
  readonly label: string;
  readonly permission?: string;
  link?: string;
  content: React.ReactNode;
}

type Position = 'left' | 'right' | 'center';
type Size = 'large';
type BackgroundColor = 'bright';

export interface TabsHandle {
  switchToTab: (tabName: string) => void;
}

interface TabsProps {
  tabs: Tab[];
  indexOfActiveTab?: number;
  storageKey?: string;
  position?: Position;
  size?: Size;
  backgroundColor?: BackgroundColor;
  // ref?: React.Ref<TabsHandle>;
}

const styledWrapper = (position: Position) => ({
  textAlign: position,
  // height: 'auto !important',
  marginTop: '24px',
  marginBottom: '24px',
  '@media (max-width: 435px)': {
    textAlign: 'center',
  },
});

const Tabs = forwardRef<TabsHandle, TabsProps>(
  ({ tabs, indexOfActiveTab = 0, storageKey, position = 'center', size, backgroundColor }, ref) => {
    const { activeTab, switchTab, tabs: tabItems } = useTabs({ tabs, storageKey, indexOfActiveTab });
    const [fixedTabs, setFixedTabs] = useState<Tab[]>(tabs);
    // const { permissions: userPermissions } = useAppSelector(state => state.authentication.account);
    // TODO: change, when API will done

    // @ts-ignore
    const filteredTabs = tabItems.filter(tab => !tab.permission);

    useImperativeHandle(ref, () => ({
      switchToTab: (tabName: string) => { // @ts-ignore
        if (tabItems.some(tab => tab.name === tabName)) {
          switchTab(tabName);
        }
      },
    }));

    const navigate = useNavigate();

    const customActionTabSwitch = (nameOfTab: string, content: React.ReactNode, newLink: string) => {
      setFixedTabs(prevTabs =>
        prevTabs.map(tab =>
          tab.name === nameOfTab
            ? ({ ...tab, newLink, content } as Tab) // Явно вказуємо, що це тип Tab
            : tab
        )
      );

      switchTab(nameOfTab);

      fixedTabs.forEach(tab => {
        if (tab.name === nameOfTab) {
          navigate(newLink);
        }
      });
    };

    if (tabs.length === 0) {
      return <div className="tabs__empty">No tabs available</div>;
    }

    return (
      <>
        <Box sx={styledWrapper(position as Position)}>
          <div className={clsx('tabs', size, backgroundColor)}>
            {/*@ts-ignore*/}
            {filteredTabs.map(tab => (
              <Button
                tag={tab.link ? Link : 'button'}
                to={tab.link ? tab.link : undefined}
                role="tab"
                aria-selected={activeTab === tab.name}
                onClick={() => {
                  switchTab(tab.name);
                }}
                className={clsx('tab', {
                  active: activeTab === tab.name, // @ts-ignore
                  [size]: size,
                })}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </Box>

        {/*@ts-ignore*/}
        {filteredTabs.map(tab => {
          if (activeTab !== tab.name) {
            return null;
          }

          return (
            <div className="tab__content" key={tab.name}>
              {React.isValidElement(tab.content)
                ? React.cloneElement(
                    tab.content as DetailedReactHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>,
                    { switchTabContent: customActionTabSwitch } as HTMLAttributes<HTMLElement> | undefined
                  )
                : tab.content}
              <Outlet />
            </div>
          );
        })}
      </>
    );
  }
);

export default Tabs;
