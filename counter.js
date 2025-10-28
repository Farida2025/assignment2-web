$(document).ready(function() {
  $(".count").each(function() {
    const $this = $(this);
    const target = +$this.attr("data-target");
    let count = 0;
    const speed = 30; 

    const updateCount = () => {
      if (count < target) {
        count += Math.ceil(target / 100);
        $this.text(count > target ? target : count);
        setTimeout(updateCount, speed);
      } else {
        $this.text(target);
      }
    };

    updateCount();
  });
});
