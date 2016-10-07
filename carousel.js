(function () {
	let inbox = document.getElementById('inbox'),
	left = document.getElementById('left'),
	right = document.getElementById('right'),
	circleBar = document.getElementsByClassName('circle-bar')[0];
	circles = document.getElementsByClassName('circle'),
	sum = 3,
	_img = new Image(),
	img_ = new Image();
	inbox.appendChild(_img);
	inbox.appendChild(img_);

	// 添加小圆点
	for (let i = 0; i < sum; i++) {
		let circle = document.createElement('span');
		circle.className = 'circle';
		circleBar.appendChild(circle);
	}

	_img.className = 'enter';
	_img.onload = () => {
		_img.className = 'enter enter-active';
		circles[0].className += ' circle-active';
		startAnim();
	}
	_img.src = './img/1.png';

	/**
	 * 绑定事件
	 */
	let key = true; // 按键锁
	isAnim = false;
	left.onclick = () => {
		if (isAnim) {
			clearInterval(interval);
			console.log('动画已取消，取消的定时器id为：',interval);
		}
		if (key) {
			oneAnim();
			key = false;
			setTimeout(() => {
				key = true;
				startAnim();
			}, 1600)
		}
	}
	right.onclick = () => {
		if (isAnim) {
			clearInterval(interval);
			console.log('动画已取消，取消的定时器id为：',interval);
		}
		if (key) {
			oneAnim(true);
			key = false;
			setTimeout(() => {
				key = true;
				startAnim(true);
			}, 1600)
		}
	}

	let oldImg = img_,
	newImg = _img,
	i = 1;
	const oneAnim = (direc) => {
		let suffix = '';
		if (direc) {
			suffix = '-right';
		}
		img = oldImg;
		oldImg = newImg;
		newImg = img;
		newImg.src = '';
		oldImg.className = 'leave' + suffix;
		newImg.className = 'enter' + suffix;
		newImg.onload = () => {
			setTimeout(() => {
				newImg.className += ' enter-active' + suffix;
				oldImg.className += ' leave-active' + suffix;
			}, 100);
		}
		circles[i-1].className = 'circle';
		if (direc) {
			i--;
			if (i < 1) {
				i = sum;
			}
		} else {
			i++;
			if (i > sum) {
				i = 1;
			}
		}
		newImg.src = './img/' + i + '.png';
		circles[i-1].className = 'circle circle-active';
	}

	let interval;
	const startAnim = (direc) => {
		isAnim = true;
		let anim = oneAnim;
		interval = setInterval( () => {
			oneAnim(direc);
		}, 3000);
		console.log('动画已启动，定时器id为：',interval);
	}
})();		