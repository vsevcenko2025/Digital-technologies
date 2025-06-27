import * as THREE from 'three';
import { MindARThree } from 'mindar-image-three';

document.addEventListener("DOMContentLoaded", () => {
  const start = async () => {

    const mindarThree = new MindARThree({
      container: document.body,
      imageTargetSrc: "Week8.mind" 
    });

    const { renderer, scene, camera } = mindarThree;
    
    const anchor = mindarThree.addAnchor(0); // Додаємо анкор для об'єктів

    // Завантаження текстури Сатурна
    const textureLoader = new THREE.TextureLoader();
    const saturnTexture = textureLoader.load("textures/2k_saturn_ring_alpha.png");

    // Створення Сатурна
    const saturn = new THREE.Mesh(
      new THREE.SphereGeometry(0.6, 64, 64),
      new THREE.MeshStandardMaterial({ map: saturnTexture })
    );
    saturn.rotation.x = THREE.MathUtils.degToRad(27); // Нахил осі
    anchor.group.add(saturn);

    // Кільця Сатурна
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xccccff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5,
    });

    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.75, 1.35, 128),
      ringMaterial
    );
    ring.rotation.x = -Math.PI / 2; // Встановлення кільця в горизонтальне положення
    anchor.group.add(ring);

    // Створення групи для Сатурна і кілець
    const saturnGroup = new THREE.Group();
    saturnGroup.add(saturn);
    saturnGroup.add(ring);
    anchor.group.add(saturnGroup);

    // Додавання освітлення
    const light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(5, 5, 5);
    anchor.group.add(light);

    // Анімація: обертання Сатурна всередині кілець
    await mindarThree.start();

    renderer.setAnimationLoop(() => {
      saturn.rotation.y += 0.005;
      saturnGroup.rotation.y += 0.001;
      renderer.render(scene, camera);
    });
  };

  start();
});


