/* eslint-disable indent */
import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import {
  AppBar,
  Card,
  CardActions,
  CardContent,
  CssBaseline,
  Grid,
  Toolbar,
  Typography,
  Container,
  Chip,
  InputBase,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  ListItemText,
  Checkbox,
  CircularProgress
} from '@material-ui/core/'
import {
  AddShoppingCart as AddShoppingCartIcon,
  LocalShipping as LocalShippingIcon,
  Search as SearchIcon
} from '@material-ui/icons/'
import NumberFormat from 'react-number-format'
import {
  filter,
  cloneDeep,
  lowerCase,
  includes,
  isEmpty,
  find,
  map
} from 'lodash'

import NotFoundImage from '../src/notFound.svg'

import Style from './style'

export default function Index() {
  // useState
  const [isFetchingData, setIsFetchingData] = useState(false)
  const [furniture, setFurniture] = useState({
    data: [],
    selected: []
  })
  const [deliveryTime, setDeliveryTime] = useState({
    data: ['1 week', '2 week', '1 month', 'more'],
    selected: []
  })
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [search, setSearch] = useState('')

  // useEffect
  useEffect(() => {
    const fetchData = async () => {
      setIsFetchingData(true)
      const response = await Axios.get(
        'http://www.mocky.io/v2/5c9105cb330000112b649af8'
      )

      setFurniture({ ...furniture, data: response.data.furniture_styles })
      setProducts(response.data.products)

      setIsFetchingData(false)
    }

    fetchData()
  }, [])

  // for search input
  const onSearch = () => {
    const dataProducts = cloneDeep(products)
    if (search !== '') {
      setFilteredProducts(
        filter(dataProducts, dataProduct =>
          includes(lowerCase(dataProduct.name), lowerCase(search))
        )
      )
    } else setFilteredProducts(products)
  }
  useEffect(() => {
    onSearch()
  }, [search])

  // for filter furniture or category
  const onFilterCategory = () => {
    const dataProducts = cloneDeep(products)
    const { selected } = furniture
    if (!isEmpty(selected)) {
      setFilteredProducts(
        filter(dataProducts, product =>
          includes(
            map(
              product.furniture_style,
              style =>
                find(selected, selectedFilter => selectedFilter === style) !==
                undefined
            ),
            true
          )
        )
      )
    } else setFilteredProducts(products)
  }
  useEffect(() => {
    onFilterCategory()
  }, [furniture.selected])

  // for filter delivery time
  const onFilterDelivery = () => {
    const dataProducts = cloneDeep(products)
    setFilteredProducts(
      filter(
        dataProducts,
        product =>
          find(deliveryTime.selected, timeSelected => {
            if (product.delivery_time <= 7) return timeSelected === '1 week'
            if (product.delivery_time <= 14) return timeSelected === '2 week'
            if (product.delivery_time <= 30) return timeSelected === '1 month'
            return timeSelected === 'more'
          }) !== undefined
      )
    )
  }
  useEffect(() => {
    onFilterDelivery()
  }, [deliveryTime.selected])

  const classes = Style()

  return (
    <>
      <CssBaseline />
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.toolbarDiv}>
            <AddShoppingCartIcon className={classes.icon} />
            <Typography variant="h6" color="inherit" noWrap>
              My Simple Furniture
            </Typography>
          </div>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Type keyword and hit enter..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              value={search}
              onChange={event => setSearch(event.target.value)}
            />
          </div>
        </Toolbar>
      </AppBar>
      <main className={classes.main}>
        {isFetchingData ? (
          <Grid className={classes.loadingScreen}>
            <CircularProgress />
          </Grid>
        ) : (
          <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <FormControl className={classes.formControl}>
                  <InputLabel>Filter Furniture</InputLabel>
                  <Select
                    multiple
                    style={{ marginBottom: 20 }}
                    value={furniture.selected}
                    onChange={event =>
                      setFurniture({
                        ...furniture,
                        selected: event.target.value
                      })
                    }
                    renderValue={selected => (
                      <div className={classes.chips}>
                        {selected.map(value => (
                          <Chip
                            key={value}
                            label={value}
                            className={classes.chip}
                            size="small"
                          />
                        ))}
                      </div>
                    )}
                  >
                    {furniture.data.map(category => (
                      <MenuItem key={category} value={category}>
                        <Checkbox
                          checked={furniture.selected.indexOf(category) > -1}
                        />
                        <ListItemText primary={category} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl className={classes.formControl}>
                  <InputLabel>Filter Delivery Time</InputLabel>
                  <Select
                    multiple
                    style={{ marginBottom: 20 }}
                    value={deliveryTime.selected}
                    onChange={event =>
                      setDeliveryTime({
                        ...deliveryTime,
                        selected: event.target.value
                      })
                    }
                    renderValue={selected => (
                      <div className={classes.chips}>
                        {selected.map(value => (
                          <Chip
                            key={value}
                            label={value}
                            className={classes.chip}
                            size="small"
                          />
                        ))}
                      </div>
                    )}
                  >
                    {deliveryTime.data.map(time => (
                      <MenuItem key={time} value={time}>
                        <Checkbox
                          checked={deliveryTime.selected.indexOf(time) > -1}
                        />
                        <ListItemText primary={time} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={4}>
              {(search !== '' ||
                !isEmpty(furniture.selected) ||
                !isEmpty(deliveryTime.selected)) &&
              isEmpty(filteredProducts) ? (
                <>
                  <img
                    src={NotFoundImage}
                    alt="not found"
                    className={classes.notFoundImage}
                  />
                  <p className={classes.paragraphNotFound}>
                    Oooops sorry, data not found...
                  </p>
                </>
              ) : (
                (search === '' &&
                isEmpty(furniture.selected) &&
                isEmpty(deliveryTime.selected)
                  ? products
                  : filteredProducts
                ).map(product => (
                  <Grid item key={product.name} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                      <CardContent className={classes.cardContent}>
                        <>
                          <Typography
                            gutterBottom
                            variant="h6"
                            component="h6"
                            className={classes.productName}
                          >
                            {product.name}
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="h6"
                            component="h6"
                            className={classes.productPrice}
                          >
                            <NumberFormat
                              value={product.price}
                              displayType="text"
                              thousandSeparator="."
                              decimalSeparator=","
                              prefix="Rp. "
                            />
                          </Typography>
                        </>

                        <Typography className={classes.productDescription}>
                          {product.description.length > 114
                            ? `${product.description.substr(0, 114)}...`
                            : product.description}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        {product.furniture_style.map(idx => (
                          <Chip
                            key={idx}
                            label={idx}
                            color="secondary"
                            variant="outlined"
                            size="small"
                          />
                        ))}
                      </CardActions>
                      <Toolbar>
                        <LocalShippingIcon
                          className={classes.icon}
                          color="primary"
                        />
                        <Typography
                          className={classes.deliveryTime}
                          variant="h6"
                          color="inherit"
                          noWrap
                        >
                          {product.delivery_time === '1'
                            ? 'Besok Sampai'
                            : `${product.delivery_time} Hari Pengiriman`}
                        </Typography>
                      </Toolbar>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          </Container>
        )}
      </main>
    </>
  )
}
