import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
const meta = require("./metadata.json");

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: "15px",
    color: "black",
    padding: "3px 10px",
    minWidth: "20px",
    "&:hover": {
      color: "#006aff",
    },
    "&.Mui-selected": {
      color: "#006aff",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  })
);

const TabBar = (props) => {
  const { scrollTop } = props;
  const [value, setValue] = useState(0);

  useEffect(() => {
    const ele = document.getElementsByClassName("detailItem");
    if (ele != null) {
      const parentEle = document.getElementsByClassName("detailMain")[0];
      for (let i = 0; i < ele.length; i++) {
        const selEle = document.getElementsByClassName("detailItem")[i];
        const eleTop = selEle.offsetTop - parentEle.offsetTop;
        if (eleTop >= scrollTop && eleTop <= scrollTop + 520) {
          setValue(i);
          break;
        }
      }
    }
  }, [scrollTop]);

  const handleChange = (event, newValue) => {
    const parentEle = document.getElementsByClassName("detailMain")[0];
    const selEle = document.getElementsByClassName("detailItem")[newValue];
    const scrollTop = selEle.offsetTop - parentEle.offsetTop;
    parentEle.scroll({
      top: scrollTop,
      behavior: "smooth",
    });

    setValue(newValue);
  };

  const catList = meta.reduce((list, item) => list.includes(item.category) ? list : [...list, item.category], []);

  // const tabList = catList.reduce((tabList, category) => {
  //   if (Object.keys(data).includes(category)) tabList.push(category)
  //   return tabList;
  // }, [])

  return (
    <Box
      sx={{
        [`& .${tabsClasses.scrollButtons}`]: {
          "&.Mui-disabled": { opacity: 0.3 },
        },
      }}
    >
      <hr />
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
      >
        {catList.map((labelName) => (
          <StyledTab label={labelName} key={labelName} />
        ))}
      </Tabs>
      <hr />
    </Box>
  );
};

export default TabBar;
