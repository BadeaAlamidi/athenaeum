<script>
    export let mode="clockwise";
    export let text="";
</script>

<div style:margin="0 auto 0 auto" class="flex justify-center items-center flex-col">
    <svg class="spinner" viewBox="0 0 50 50" data-direction={mode}>
        <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
    </svg>
    <p>{text}</p>
</div>

<style>
.spinner {
  animation: rotate 2s linear infinite;
  width:  50px;
  height: 50px;
  filter: blur(0.4px);
}
.spinner[data-direction="counter-clockwise"]{
    animation: rotate 4s linear reverse infinite;
}
.path{
    stroke-linecap: round;
}
.spinner[data-direction="clockwise"] .path{
    stroke: rgb(143, 187, 231);
    animation: dash 1.5s ease-in-out infinite;
}
.spinner[data-direction="counter-clockwise"] .path{
    stroke: rgb(36, 56, 75);
    animation: dash 3s ease-in-out reverse infinite;
}
@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}

</style>