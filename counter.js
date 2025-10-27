$(document).ready(function() {
  $(".count").each(function() {
    const $this = $(this);
    const target = +$this.attr("data-target");
    let count = 0;
    const speed = 30; // меньше = быстрее

    const updateCount = () => {
      if (count < target) {
        count += Math.ceil(target / 100); // шаг
        $this.text(count > target ? target : count);
        setTimeout(updateCount, speed);
      } else {
        $this.text(target);
      }
    };

    updateCount();
  });
});
