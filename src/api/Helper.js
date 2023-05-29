/* eslint-disable class-methods-use-this */
class Helper {
  checkUserRole(user) {
    return user.role_id === 3 || user.role_id === 4;
  }

  roundRating(product) {
    if (product.reviews && product.reviews.length > 0) {
      const sum = product.reviews.reduce((a, b) => a + Number(b.rating), 0);
      return (sum / product.reviews.length).toFixed(1).replace('.', ',');
    }

    return 0;
  }

  formattedPrice(price) {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' })
      .format(price).split(',')[0];
  }
}

export default Helper;
