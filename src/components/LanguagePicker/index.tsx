import { useTranslation } from 'react-i18next';
import { useState, useContext } from 'react';
import { Link, Popper, Box, Fade, Button, makeStyles, Paper, SvgIcon, useMediaQuery, Divider } from '@material-ui/core';
import { AppThemeContext } from 'src/helpers/app-theme-context';
import './language-picker.scss';
import { ReactComponent as IntlIcon } from '../../assets/icons/intl.svg';
import { showTranslations } from 'translation-check';

//Add new translations to the dropdown here!
const lngs: any = {
  en: { nativeName: 'English' },
  de: { nativeName: 'Deutsch' },
  fr: { nativeName: 'Français' },
  it: { nativeName: 'Italiano' },
  id: { nativeName: 'Bahasa' },
  no: { nativeName: 'Norsk' },
  tl: { nativeName: 'Tagalog' },
};

interface Props {
  border: Boolean;
}
function LanguagePicker(props: Props) {
  const { t, i18n } = useTranslation();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any, lng: string) => {
    i18n.changeLanguage(lng);
    i18n.reloadResources();
    //translations aren't reloading correctly for all components,
    //force reload
    // window.location.reload();
  };
  const handleMouseOver = (event: any) => {
    setlangDropdownOpen(true);
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleMouseExit = () => {
    setlangDropdownOpen(false);
    setAnchorEl(null);
  };
  const currentTheme = useContext(AppThemeContext);
  const useStyles = makeStyles(theme => ({
    popperMenu: {
      '& .select-language:hover': {
        backgroundColor: currentTheme.theme.palette.mode.lightGray200,
      },
    },
    colour: {
      '& path': {
        fill: `${currentTheme.theme.palette.primary.main} !important`,
      },
    },
  }));
  const styles = useStyles();

  const getStyle = (lng: string) => {
    return i18n.resolvedLanguage === lng ? 'bold' : 'normal';
  };
  const id = 'lang-popper';
  const [langDropdownOpen, setlangDropdownOpen] = useState(false);

  return (
    <Box onMouseEnter={e => handleMouseOver(e)} onMouseLeave={() => handleMouseExit()} id="lang-menu-button-hover">
      <Box className={`lang-button-border-${props.border.toString()} ohm-button`} color="text.primary">
        <SvgIcon
          component={IntlIcon}
          className={`${styles.colour}`}
          style={{
            marginRight: '10px',
            width: '24px',
            height: '24px',
          }}
        />
        {i18n.resolvedLanguage.toUpperCase()}
        <Popper
          className={`${styles.popperMenu} ohm-menu`}
          id={id}
          open={langDropdownOpen}
          anchorEl={anchorEl}
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={400}>
              <Paper className={`lang-menu`} elevation={1}>
                <Box component="div" className="buy-tokens">
                  {Object.keys(lngs).map(lng => (
                    <Button
                      key={lng}
                      style={{ fontWeight: getStyle(lng) }}
                      type="submit"
                      onClick={e => handleClick(e, lng)}
                      className="select-language"
                    >
                      {lngs[lng].nativeName}
                    </Button>
                  ))}

                  <Divider color="secondary" />
                  <Button className="select-language" onClick={e => showTranslations(i18n)}>
                    {t('common.helpTranslate')}
                  </Button>
                </Box>
              </Paper>
            </Fade>
          )}
        </Popper>
      </Box>
    </Box>
  );
}

export default LanguagePicker;
