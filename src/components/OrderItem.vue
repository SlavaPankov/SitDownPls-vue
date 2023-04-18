<template>
  <article class="order-item">
    <router-link :to="{ name: 'createdOrder', params: { id: order.id } }">
      <h3 class="heading-reset order-item__heading">
        Заказ №{{ order.id }}
      </h3>
      <ul class="list-reset order-item__info info-list">
        <li class="info-list__item">
          Статус: <span class="bold">{{ order.status.name }}</span>
        </li>
        <li class="info-list__item">
          Доставка: <span class="bold">{{ order.delivery.name }}</span>
        </li>
        <li class="info-list__item">
          Оплата: <span class="bold">{{ order.payment.name }}</span>
        </li>
      </ul>
      <div class="order-item__price">
        {{ order.total_price }} руб.
      </div>
      <div class="order-item__link">
        Подробнее
      </div>
    </router-link>
  </article>
</template>

<script>
export default {
  name: 'OrderItem',
  props: {
    order: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.order-item {
  display: flex;
  flex-direction: column;
  padding: 25px;
  border-radius: 15px;
  transition: box-shadow .3s ease-in-out;
  background-color: var(--grey_light);
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 10px 10px rgba(166, 92, 240, .2);
  }

  &__heading {
    margin-bottom: 36px;
    font-size: 20px;
    line-height: 20px;
    font-weight: 400;
    color: var(--black);
  }

  &__price {
    margin-bottom: 20px;
    font-size: 16px;
    line-height: 20px;
    font-weight: 400;
    color: var(--black);
    text-align: right;
  }

  &__link {
    display: block;
    max-width: fit-content;
    font-size: 16px;
    line-height: 20px;
    font-weight: 400;
    color: var(--primary);
    border-bottom: 1px solid var(--primary);
  }
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;

  &__item {
    font-size: 16px;
    line-height: 20px;
    font-weight: 400;
    color: var(--black);
    text-align: right;
  }
}

.bold {
  font-weight: 600;
}
</style>
