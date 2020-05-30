import { makeStyles, fade } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'fixed',
    top: 0
  },
  main: {
    marginTop: 64
  },
  icon: {
    marginRight: theme.spacing(2)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
    paddingTop: '56.25%' // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  productName: {
    maxHeight: 38,
    fontSize: 18,
    overflow: 'hidden'
  },
  productPrice: {
    display: 'block',
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f35554',
    marginBottom: 10
  },
  productDescription: {
    fontSize: 14
  },
  deliveryTime: {
    fontSize: 14
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '25ch',
      '&:focus': {
        width: '30ch'
      }
    }
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  toolbarDiv: {
    display: 'flex',
    alignItems: 'center'
  },
  formControl: {
    width: '100%'
  },
  fontWeightRegular: {
    fontWeight: theme.typography.fontWeightRegular
  },
  fontWeightMedium: {
    fontWeight: theme.typography.fontWeightMedium
  },
  SelectMenu: {
    color: '#fff'
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: 2
  },
  notFoundImage: {
    marginTop: 55,
    width: '100%',
    height: 500
  },
  paragraphNotFound: {
    width: '100%',
    textAlign: 'center',
    fontSize: 20
  },
  loadingScreen: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh'
  }
}))

export default useStyles
